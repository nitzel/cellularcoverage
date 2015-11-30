class RemoveUpdatedAtFromMeasurements < ActiveRecord::Migration
  def change
    remove_column :measurements, :updated_at, :datetime
  end
end
