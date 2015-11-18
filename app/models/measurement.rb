class Measurement < ActiveRecord::Base
	validates :latitude, :longitude, :quality, numericality: true
end
