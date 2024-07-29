from config import app, db
from models.user import User
from models.trip import Trip
from models.entry import Entry

with app.app_context():
    User.query.delete()
    Trip.query.delete()
    Entry.query.delete()

    user1 = User(name='Taylor', username='tayloruser')
    user1.password_hash = 'abc123'
    user2 = User(name='Spencer', username='spenceruser')
    user2.password_hash = 'xyz789'
    db.session.add_all([user1, user2])
    db.session.commit()

    trip1 = Trip(name='Macchu Pichu', location='Peru', total_miles=26, image_path='/images/macchu_picchu.jpg')
    trip2 = Trip(name='Milford Track', location='New Zealand', total_miles=33, image_path='/images/milford_track.jpg')
    trip3 = Trip(name="Hadrian's Wall Path", location='England', total_miles=84, image_path='/images/hadrian.jpg')
    trip4 = Trip(name="West Highland Way", location='Scotland', total_miles=96, image_path='/images/west_highland.jpg')
    trip5 = Trip(name='Tour du Mont Blanc', location='Europe', total_miles=105, image_path='/images/mont_blanc.jpg')
    trip6 = Trip(name='Grand Canyon', location='United States', total_miles=277, image_path='/images/grand_canyon.jpg')
    trip7 = Trip(name='Great Barrier Reef', location='Australia', total_miles=1430, image_path='/images/gb_reef.jpg')
    trip8 = Trip(name='Appalachian Trail', location='United States', total_miles=2168, image_path='/images/appalachian_trail.jpg')
    trip9 = Trip(name='Nile River', location='Egypt', total_miles=4130, image_path='/images/nile_river.jpg')
    trip10 = Trip(name='Great Wall of China', location='China', total_miles=13171, image_path='/images/great_wall.jpg')
    
    db.session.add_all([trip1, trip2, trip3, trip4, trip5, trip6, trip7, trip8, trip9, trip10])
    db.session.commit()

    entry1 = Entry(date='07-02-24', miles=4.5, user_id=1, trip_id=1)
    entry2 = Entry(date='07-03-24', miles=2.6, user_id=1, trip_id=4)
    entry3 = Entry(date='07-04-24', miles=7.3, user_id=2, trip_id=1)
    entry4 = Entry(date='07-05-24', miles=5.2, user_id=2, trip_id=5)

    db.session.add_all([entry1, entry2, entry3, entry4])
    db.session.commit()
