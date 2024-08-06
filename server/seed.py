from faker import Faker
from app import app
from models import db, User

fake = Faker()

def seed_users():
    with app.app_context():
        # Create all tables
        db.create_all()

        # Clear existing users
        User.query.delete()

        # Generate fake users
        users = []
        for _ in range(10):  # Create 10 users
            user = User(
                roles=fake.word(),
                email=fake.unique.email(),
                password=fake.password(length=12)  # Adjust length as needed
            )
            users.append(user)
        
        # Print sample of generated users
        print("Sample of generated users:")
        for user in users[:3]:  # Print first 3 users as sample
            print(f"Roles: {user.roles}, Email: {user.email}")

        # Confirm before adding users to the database
        confirm = input("Do you want to add these users to the database? (yes/no): ")
        if confirm.lower() == 'yes':
            for user in users:
                db.session.add(user)
            db.session.commit()  # Commit users to get their IDs
            print("Users added to the database.")
        else:
            print("Users not added to the database.")
            exit()

if __name__ == "__main__":
    seed_users()
