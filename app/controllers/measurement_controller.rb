class MeasurementController < ApplicationController
	def new
	end
	
	def create
		measurement = Measurement.new(measurement_params)
		success = measurement.save()
		render plain: success
	end
	
	private
		def measurement_params
			params.require(:measurement).permit(:latitude, :longitude, :quality)
		end
end
