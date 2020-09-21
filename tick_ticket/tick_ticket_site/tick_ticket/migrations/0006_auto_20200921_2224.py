# Generated by Django 2.2.2 on 2020-09-21 22:24

import datetime
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('tick_ticket', '0005_auto_20200921_2217'),
    ]

    operations = [
        migrations.CreateModel(
            name='BoughtTicket',
            fields=[
                ('ticket_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='tick_ticket.Ticket')),
                ('bought_on', models.DateTimeField(default=datetime.datetime.now)),
            ],
            bases=('tick_ticket.ticket',),
        ),
        migrations.AlterField(
            model_name='ticket',
            name='arrive_date',
            field=models.DateField(default=datetime.datetime.now),
        ),
        migrations.AlterField(
            model_name='ticket',
            name='arrive_time',
            field=models.TimeField(),
        ),
        migrations.AlterField(
            model_name='ticket',
            name='available_until',
            field=models.DateField(default=datetime.datetime.now),
        ),
        migrations.AlterField(
            model_name='ticket',
            name='departure_date',
            field=models.DateField(default=datetime.datetime.now),
        ),
        migrations.AlterField(
            model_name='ticket',
            name='departure_time',
            field=models.TimeField(),
        ),
        migrations.AlterField(
            model_name='ticket',
            name='published_on',
            field=models.DateField(default=datetime.datetime.now),
        ),
    ]
