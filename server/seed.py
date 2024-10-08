from config import app, db
from models.user import User
from models.trip import Trip
from models.entry import Entry

with app.app_context():
    User.query.delete()
    Trip.query.delete()
    Entry.query.delete()
    
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
    trip11 = Trip(name='Barksoon Gorge', location='Kyrgyzstan', total_miles=19, image_path='/images/barksoon.jpg', premium=1)
    trip12 = Trip(name='Otter Trail', location='South Africa', total_miles=25, image_path='/images/otter.jpg', premium=1)
    trip13 = Trip(name='Macchu Picchu', location='Peru', total_miles=26, image_path='/images/macchu_picchu.jpg', premium=1)
    trip14 = Trip(name='Milford Track', location='New Zealand', total_miles=33, image_path='/images/milford_track.jpg', premium=1)
    trip15 = Trip(name='Laugavegur Trail', location='Iceland', total_miles=34, image_path='/images/lauga.jpg', premium=1)
    trip16 = Trip(name='Trollheimen Triangle', location='Norway', total_miles=36, image_path='/images/trollheimen.jpeg', premium=1)
    trip17 = Trip(name='Hadrian\'s Wall Path', location='England', total_miles=84, image_path='/images/hadrian.jpg', premium=1)
    trip18 = Trip(name='Tour du Mont Blanc', location='Europe', total_miles=105, image_path='/images/mont_blanc.jpg', premium=1)
    trip19 = Trip(name='Rota Vicentina', location='Portugal', total_miles=137, image_path='/images/rota.jpg', premium=1)
    trip20 = Trip(name='Great Barrier Reef', location='Australia', total_miles=1430, image_path='/images/gb_reef.jpg', premium=1)

    db.session.add_all([trip1, trip2, trip3, trip4, trip5, trip6, trip7, trip8, trip9, trip10])
    db.session.add_all([trip11, trip12, trip13, trip14, trip15, trip16, trip17, trip18, trip19, trip20])
    db.session.commit()
