class MeasurementController < ApplicationController
	def new
	end
	
	def create
		measurement = Measurement.create(measurement_params)
		render plain: measurement
	end
	
	private
		def measurement_params
			params.require(:measurement).permit(:latitude, :longitude, :quality)
		end
end
