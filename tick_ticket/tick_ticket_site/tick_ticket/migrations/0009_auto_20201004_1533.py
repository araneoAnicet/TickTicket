# Generated by Django 2.2.2 on 2020-10-04 15:33

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('tick_ticket', '0008_auto_20201004_1531'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='boughtticket',
            name='bought_on_date',
        ),
        migrations.RemoveField(
            model_name='boughtticket',
            name='bought_on_time',
        ),
        migrations.AddField(
            model_name='boughtticket',
            name='bought_on',
            field=models.DateTimeField(default=datetime.datetime.now),
        ),
    ]
