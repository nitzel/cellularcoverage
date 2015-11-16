class MeasurementController < ApplicationController
	def new
	end
	
	def create
		render plain: params[:measurement].inspect
	end
end
