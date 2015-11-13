class WelcomeController < ApplicationController
	def index
	end
	
	def test
	end
	
	def test_post
		data = params[:data]
		render :text => data.length, :layout => false
	end
end
