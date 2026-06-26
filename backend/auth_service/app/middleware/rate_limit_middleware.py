import time
from fastapi import Request, HTTPException
from app.core.redis import redis_client


class RateLimiter:

    def __init__(self, max_requests: int, window: int):
        self.max_requests = max_requests
        self.window = window

    async def __call__(self, request: Request):
        client_ip = request.client.host
        key = f"rate_limit:{client_ip}:{request.url.path}"
        current = redis_client.get(key)

        if current is None:
            redis_client.set( key, 1, ex = self.window )
            return

        current = int(current)

        if current >= self.max_requests:
            ttl = redis_client.ttl(key)
            raise HTTPException( status_code = 429, detail = f"Too many requests. Try again after {ttl} seconds." )

        redis_client.incr(key)