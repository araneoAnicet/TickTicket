# Generated by Django 2.2.2 on 2020-09-21 22:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('tick_ticket', '0004_auto_20200921_2215'),
    ]

    operations = [
        migrations.AlterField(
            model_name='ticket',
            name='arrive_date',
            field=models.DateField(auto_now=True),
        ),
        migrations.AlterField(
            model_name='ticket',
            name='arrive_time',
            field=models.TimeField(auto_now=True),
        ),
        migrations.AlterField(
            model_name='ticket',
            name='available_until',
            field=models.DateField(auto_now=True),
        ),
        migrations.AlterField(
            model_name='ticket',
            name='departure_date',
            field=models.DateField(auto_now=True),
        ),
        migrations.AlterField(
            model_name='ticket',
            name='departure_time',
            field=models.TimeField(auto_now=True),
        ),
    ]