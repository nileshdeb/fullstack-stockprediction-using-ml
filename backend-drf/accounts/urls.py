from django.urls import path
from .views import (
    PasswordResetConfirmView,
    PasswordResetRequestView,
    ProjectedView,
    RegisterView,
)

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('protected-view/', ProjectedView.as_view(), name='protected_view'),
    path('password-reset/', PasswordResetRequestView.as_view(), name='password_reset'),
    path(
        'password-reset-confirm/',
        PasswordResetConfirmView.as_view(),
        name='password_reset_confirm',
    ),
]
