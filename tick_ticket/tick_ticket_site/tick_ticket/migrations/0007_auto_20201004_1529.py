# Generated by Django 2.2.2 on 2020-10-04 15:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('tick_ticket', '0006_auto_20201004_1525'),
    ]

    operations = [
        migrations.AlterField(
            model_name='ticket',
            name='number_of_available',
            field=models.IntegerField(default=0),
        ),
    ]
