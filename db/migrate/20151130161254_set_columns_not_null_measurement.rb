class SetColumnsNotNullMeasurement < ActiveRecord::Migration
  def change
  	change_column_null :measurements, :latitude, false
  	change_column_null :measurements, :longitude, false
  	change_column_null :measurements, :quality, false
  end
end
