# Generated by Django 2.2.2 on 2020-09-21 13:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('tick_ticket', '0002_carrier_ticket'),
    ]

    operations = [
        migrations.AddField(
            model_name='ticket',
            name='number_of_available',
            field=models.DecimalField(decimal_places=3, default=1, max_digits=5),
        ),
        migrations.AddField(
            model_name='ticket',
            name='published_on',
            field=models.DateField(auto_now=True),
        ),
    ]