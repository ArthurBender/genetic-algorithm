FROM ruby:3.2.0

RUN apt-get update && apt-get install nodejs -y

RUN gem install bundler -v 2.4.4

WORKDIR /app

COPY Gemfile Gemfile.lock ./

RUN bundle install

COPY . ./

ENTRYPOINT ["./docker-entrypoint.sh"]
