// 測試 Supabase 連接
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

console.log('測試 Supabase 連接...');
console.log('URL:', supabaseUrl);
console.log('Service Key:', supabaseServiceKey ? '已設置' : '未設置');

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function testConnection() {
  try {
    // 測試基本連接
    const { data, error } = await supabase.auth.admin.listUsers();
    
    if (error) {
      console.error('連接錯誤:', error.message);
    } else {
      console.log('✓ Supabase 連接成功');
      console.log('現有用戶數量:', data.users.length);
      
      // 檢查是否有管理員用戶
      const adminUser = data.users.find(user => user.email === 'admin@system.com');
      if (adminUser) {
        console.log('✓ 找到管理員帳號:', adminUser.email);
        console.log('用戶 ID:', adminUser.id);
        console.log('用戶名:', adminUser.user_metadata?.username);
      } else {
        console.log('✗ 未找到管理員帳號');
      }
    }
  } catch (error) {
    console.error('測試失敗:', error.message);
  }
}

testConnection();