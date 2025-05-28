FRONT-END

pnpm install
pnpm dev

BACK-END

# terminal 1 – ambiente virtual (opcional)
python -m venv venv
source venv/bin/activate
venv\Scripts\Activate.ps1


# instalar deps
pip install -r requirements.txt

# subir servidor
uvicorn backend.main:app --reload --port 8000