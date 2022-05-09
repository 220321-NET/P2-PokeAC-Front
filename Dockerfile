FROM node:latest as build

WORKDIR /NGPokeAC

COPY . .

RUN npm install
RUN npm run build

FROM nginx:latest

WORKDIR /NGPokeAC


COPY --from=build /app/dist .


#docker build . -t chainofazns/pokeac-front

#docker run -p 5000:80 -d chainofazns/pokeac-back  this is for local stuff, try to remember how you tied it to azure and github some other time

#docker push chainofazns/pokeac-front