import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.SUPABASE_URL || 'your_supabase_url'
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || 'your_supabase_anon_key'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// 資料庫表格初始化
export const initializeTables = async () => {
  try {
    // 創建 global_user 表格
    const { error: userTableError } = await supabase.rpc('create_global_user_table')
    if (userTableError && !userTableError.message.includes('already exists')) {
      console.error('Error creating global_user table:', userTableError)
    }

    // 插入預設管理員帳號
    const { data: existingAdmin } = await supabase
      .from('global_user')
      .select('*')
      .eq('user', 'admin')
      .single()

    if (!existingAdmin) {
      const { error: adminError } = await supabase
        .from('global_user')
        .insert([
          {
            user: 'admin',
            email: 'admin@system.com',
            password_hash: '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi' // adminacl53959233
          }
        ])
      
      if (adminError) {
        console.error('Error creating admin user:', adminError)
      } else {
        console.log('Admin user created successfully')
      }
    }
  } catch (error) {
    console.error('Error initializing tables:', error)
  }
}

export default supabase