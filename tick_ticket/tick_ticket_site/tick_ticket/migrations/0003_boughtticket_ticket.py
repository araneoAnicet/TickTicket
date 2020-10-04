# Generated by Django 2.2.2 on 2020-10-04 15:17

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('tick_ticket', '0002_remove_boughtticket_ticket'),
    ]

    operations = [
        migrations.AddField(
            model_name='boughtticket',
            name='ticket',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='shopping_information', to='tick_ticket.Ticket'),
        ),
    ]
