FROM --platform=linux/amd64  nginx:stable-alpine
RUN rm /etc/nginx/conf.d/default.conf
RUN mkdir /etc/nginx/sites-enabled/
COPY ./conf.d/default.conf /etc/nginx/conf.d/default.conf
COPY ./nginx.conf /etc/nginx/nginx.conf
COPY ./proxy.conf /etc/nginx/proxy.conf
RUN ln -s /etc/nginx/sites-available/default.conf /etc/nginx/sites-enabled/
