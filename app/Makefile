FILEPATH	=	./docker-compose.yml
COMPOSE		=	docker compose -f
TARGET		?=	dev
OS			:=	$(shell uname -s)

# ------------  RULES  ------------------------------------------------------ #
all:			dev

dev:
				@$(MAKE) TARGET=dev up

prod:
				@$(MAKE) TARGET=prod up

up:
ifeq ($(OS),Darwin)
				@$(COMPOSE) $(FILEPATH) up -d
else
				@$(COMPOSE) $(FILEPATH) --profile linux up -d
endif

down:
				@$(COMPOSE) $(FILEPATH) down

start:
				@$(COMPOSE) $(FILEPATH) start

stop:
				@$(COMPOSE) $(FILEPATH) stop

cleanimg:
				@docker image prune -a

cleanvol:
				@docker volume rm $(shell docker volume ls -q)

fclean:			down cleanimg

re:				fclean all

.PHONY:			all dev prod up ollama down start stop cleanimg cleanvol fclean re