# Generated by Django 2.2.2 on 2020-10-21 01:21

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('tick_ticket', '0012_auto_20201019_1402'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='boughtticket',
            name='bought_on',
        ),
        migrations.AddField(
            model_name='boughtticket',
            name='bought_on_date',
            field=models.DateField(default=datetime.datetime.now),
        ),
        migrations.AddField(
            model_name='boughtticket',
            name='bought_on_time',
            field=models.TimeField(default=datetime.datetime.now),
        ),
    ]
