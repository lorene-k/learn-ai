FROM ollama/ollama:0.13.0

RUN ollama serve & \
    sleep 5 && \
    ollama pull gemma2:2b && \
    pkill ollama

CMD ["ollama", "serve"]