Bundler.require

class Sweetatstic < ::Sinatra::Base
  get '/' do
    redirect "/index.html"
  end
end
