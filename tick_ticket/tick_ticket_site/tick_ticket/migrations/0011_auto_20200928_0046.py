# Generated by Django 2.2.2 on 2020-09-28 00:46

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('tick_ticket', '0010_auto_20200922_1147'),
    ]

    operations = [
        migrations.AlterField(
            model_name='boughtticket',
            name='owner',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='bought_ticket', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterField(
            model_name='creditcard',
            name='owner',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='credit_card', to=settings.AUTH_USER_MODEL),
        ),
        migrations.DeleteModel(
            name='User',
        ),
    ]
