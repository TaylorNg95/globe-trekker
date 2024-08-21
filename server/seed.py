from config import app, db
from models.user import User
from models.trip import Trip
from models.entry import Entry

with app.app_context():
    User.query.delete()
    Trip.query.delete()
    Entry.query.delete()

    user1 = User(name='User1', username='user1username')
    user1.password_hash = 'abc123'
    user2 = User(name='User2', username='user2username')
    user2.password_hash = 'xyz789'
    db.session.add_all([user1, user2])
    db.session.commit()
    
    # Free Trips
    trip1 = Trip(name='Bright Angel Trail', location='Arizona', total_miles=8, image_path='/images/bright_angel_trail.jpg')
    trip2 = Trip(name='Old Rag Mountain Loop', location='Virginia', total_miles=9, image_path='/images/old_rag_mountain.png')
    trip3 = Trip(name='Highline Trail', location='Montana', total_miles=16, image_path='/images/highline.jpg')
    trip4 = Trip(name='Four Pass Loop', location='Colorado', total_miles=26, image_path='/images/four_pass.jpg')
    trip5 = Trip(name='Teton Crest Trail', location='Wyoming', total_miles=40, image_path='/images/teton_crest.jpg')
    trip6 = Trip(name='Timberline Trail', location='Oregon', total_miles=41, image_path='/images/timberline_trail.jpg')
    trip7 = Trip(name='John Muir Trail', location='California', total_miles=211, image_path='/images/john_muir_trail.jpg')
    trip8 = Trip(name='Long Trail', location='Vermont', total_miles=272, image_path='/images/long_trail.jpg')
    trip9 = Trip(name='Grand Canyon', location='Arizona', total_miles=277, image_path='/images/grand_canyon.jpg')
    trip10 = Trip(name='Appalachian Trail', location='United States', total_miles=2198, image_path='/images/appalachian_trail.jpg')
    
    # Premium Trips
    trip11 = Trip(name='Barksoon Gorge', location='Kyrgyzstan', total_miles=19, image_path='/images/barksoon.jpg')
    trip12 = Trip(name='Otter Trail', location='South Africa', total_miles=25, image_path='/images/otter.jpg')
    trip13 = Trip(name='Macchu Picchu', location='Peru', total_miles=26, image_path='/images/macchu_picchu.jpg')
    trip14 = Trip(name='Milford Track', location='New Zealand', total_miles=33, image_path='/images/milford_track.jpg')
    trip15 = Trip(name='Laugavegur Trail', location='Iceland', total_miles=34, image_path='/images/lauga.jpg')
    trip16 = Trip(name='Trollheimen Triangle', location='Norway', total_miles=36, image_path='/images/trollheimen.jpeg')
    trip17 = Trip(name='Hadrian\'s Wall Path', location='England', total_miles=84, image_path='/images/hadrian.jpg')
    trip18 = Trip(name='Tour du Mont Blanc', location='Europe', total_miles=105, image_path='/images/mont_blanc.jpg')
    trip19 = Trip(name='Rota Vicentina', location='Portugal', total_miles=137, image_path='/images/rota.jpg')
    trip20 = Trip(name='Great Barrier Reef', location='Australia', total_miles=1430, image_path='/images/gb_reef.jpg')
    

    db.session.add_all([trip1, trip2, trip3, trip4, trip5, trip6, trip7, trip8, trip9, trip10])
    db.session.add_all([trip11, trip12, trip13, trip14, trip15, trip16, trip17, trip18, trip19, trip20])
    db.session.commit()

    entry1 = Entry(date='0000-00-00', miles=0, user_id=1, trip_id=1)
    entry2 = Entry(date='2024-07-02', miles=4.5, user_id=1, trip_id=1)
    entry3 = Entry(date='0000-00-00', miles=0, user_id=2, trip_id=4)
    entry4 = Entry(date='2024-07-04', miles=7.3, user_id=2, trip_id=4)

    db.session.add_all([entry1, entry2, entry3, entry4])
    db.session.commit()
