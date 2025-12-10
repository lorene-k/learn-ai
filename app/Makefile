FILEPATH	=	./docker-compose.yml
COMPOSE		=	docker compose -f
TARGET		?=	dev
OS			:=	$(shell uname -s)

# ------------  OLLAMA  ------------------------------------------------------ #
ifeq ($(OS),Darwin)
SERVICES = nginx frontend backend db
else
SERVICES =
endif

# ------------  RULES  ------------------------------------------------------ #
all:			dev

dev:
				@$(MAKE) TARGET=dev up

prod:
				@$(MAKE) TARGET=prod up

up:				ollama
				@$(COMPOSE) $(FILEPATH) up -d $(SERVICES)

ollama:
ifeq ($(OS),Darwin)
				@echo "Starting Ollama service on macOS..."
				@ollama serve > /dev/null 2>&1 &
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