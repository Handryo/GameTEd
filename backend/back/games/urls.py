# games/urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import GameViewSet

router = DefaultRouter()
router.register(r'games', GameViewSet)  # Registra o prefixo `games`

urlpatterns = [
    path('', include(router.urls)),  # Inclui todas as rotas do `router`
]
