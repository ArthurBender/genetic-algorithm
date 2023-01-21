class ApplicationController < ActionController::Base
    before_action :set_language

    def update_cookie_language

        if params[:lang] == 'pt-BR' || params[:lang] == 'en'
            cookies.permanent['lang'] = params[:lang]
        end

        render json: {status: true}.to_json
    end

    private

    def set_language
        language = 'pt-BR'
        language = cookies['lang'] if cookies['lang']
        I18n.locale = language
    end
end
