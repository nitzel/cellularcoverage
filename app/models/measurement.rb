class Measurement < ActiveRecord::Base
	validates :latitude, :longitude, :quality, numericality: true, presence: true
	validates :quality, inclusion: 0..10
	validates :latitude, inclusion: -90..90
	validates :longitude, inclusion: -180..180
end
