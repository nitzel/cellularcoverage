Rails.application.routes.draw do
  
  root 'welcome#index'
  
  get 'pages/index' => 'welcome#index'
  get 'pages/test' => 'welcome#test'
  
end
