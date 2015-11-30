class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :email_address, null: false, index: true
	  
      t.column :created_at,  :datetime, null: false
    end
  end
end
