# Generated by Django 2.2.2 on 2020-10-19 13:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('tick_ticket', '0009_auto_20201004_1533'),
    ]

    operations = [
        migrations.AddField(
            model_name='ticket',
            name='transport_name',
            field=models.CharField(default='any', max_length=20),
        ),
    ]
