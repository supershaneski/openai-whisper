FROM nvidia/cuda:11.8.0-base-ubuntu22.04

ENV DEBIAN_FRONTEND=noninteractive
RUN apt update && apt -y install ffmpeg python3 python3-pip git
RUN pip install git+https://github.com/openai/whisper.git
RUN apt install curl -yq
RUN curl -sL https://deb.nodesource.com/setup_19.x | bash -
RUN apt install -yq nodejs
WORKDIR /app
