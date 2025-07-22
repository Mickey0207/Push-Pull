// 設置 Supabase 認證並創建管理員帳號
const { createClient } = require('@supabase/supabase-js');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

console.log('設置 Supabase 認證...');
console.log('Supabase URL:', supabaseUrl);

if (!supabaseUrl || supabaseUrl === 'your_supabase_url') {
  console.error('請在 .env 文件中設置正確的 SUPABASE_URL');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function setupAuth() {
  try {
    console.log('1. 檢查 Supabase 連接...');
    
    // 測試連接
    const { data, error } = await supabase.from('auth.users').select('count').limit(1);
    if (error) {
      console.log('無法直接訪問 auth.users，這是正常的');
    }
    
    console.log('2. 創建管理員帳號...');
    
    // 使用 Supabase Auth 創建管理員用戶
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email: 'admin@system.com',
      password: 'adminacl53959233',
      email_confirm: true,
      user_metadata: {
        username: 'admin',
        role: 'admin'
      }
    });
    
    if (authError) {
      if (authError.message.includes('already registered')) {
        console.log('✓ 管理員帳號已存在');
      } else {
        console.error('創建管理員帳號失敗:', authError.message);
      }
    } else {
      console.log('✓ 管理員帳號創建成功');
      console.log('用戶 ID:', authData.user.id);
    }
    
    console.log('\n管理員登入資訊:');
    console.log('Email: admin@system.com');
    console.log('Password: adminacl53959233');
    console.log('Username: admin');
    
  } catch (error) {
    console.error('設置過程中發生錯誤:', error.message);
  }
}

setupAuth();