class CreateMeasurements < ActiveRecord::Migration
  def change
    create_table :measurements do |t|
      t.float :latitude
      t.float :longitude
      t.float :quality

      t.timestamps null: false
    end
  end
end
