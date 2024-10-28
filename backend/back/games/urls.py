from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import GameViewSet

router = DefaultRouter()
router.register(r'', GameViewSet)  # Define o GameViewSet para o endpoint raiz do app

urlpatterns = [
    path('', include(router.urls)),  # Inclui as rotas geradas automaticamente pelo router do DRF
]
