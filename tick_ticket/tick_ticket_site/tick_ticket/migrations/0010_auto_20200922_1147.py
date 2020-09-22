# Generated by Django 2.2.2 on 2020-09-22 11:47

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('tick_ticket', '0009_auto_20200922_1114'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='user',
            name='credit_cards',
        ),
        migrations.AddField(
            model_name='creditcard',
            name='owner',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='credit_card', to='tick_ticket.User'),
        ),
    ]
