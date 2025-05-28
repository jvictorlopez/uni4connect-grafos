FRONT-END

pnpm install
pnpm dev

BACK-END

# terminal 1 – ambiente virtual (opcional)
python -m venv venv
source venv/bin/activate

# instalar deps
pip install -r backend/requirements.txt

# subir servidor
uvicorn backend.main:app --reload --port 8000