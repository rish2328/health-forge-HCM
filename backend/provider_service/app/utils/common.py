from app.models.providers_model import ProvidersModel


def get_provider_code ( db ):
    last_provider = (db.query(ProvidersModel).order_by(ProvidersModel.id.desc()).first())
    next_number = 1

    if last_provider and last_provider.provider_code:
        last_number = int(last_provider.provider_code.split("-")[-1])
        next_number = last_number + 1

    return f"PRV-{next_number:06d}"