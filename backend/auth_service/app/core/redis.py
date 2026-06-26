import redis


redis_client = redis.Redis(
    host = "localhost",   # For Local without Docker
    # host = "redis",   # For Docker
    port = 6379,
    db = 0,
    decode_responses = True
)