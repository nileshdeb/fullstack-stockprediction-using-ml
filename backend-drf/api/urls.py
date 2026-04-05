from django.urls import path, include
from accounts import views as UserViews
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from .views import StockPredictionAPIView, CompanySearchAPIView


urlpatterns = [
   path('accounts/', include('accounts.urls')),
   path('register/', UserViews.RegisterView.as_view()),

   path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
   path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

   path('protected-view/', UserViews.ProjectedView.as_view()),

   # Prediction API
   path('predict/',  StockPredictionAPIView.as_view(), name ='stock_prediction'),

   # Company Search API
   path('search/companies/', CompanySearchAPIView.as_view(), name='company_search')

]
