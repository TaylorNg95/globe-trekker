"""creates entries

Revision ID: c8665401cae8
Revises: b7b8b5220cf9
Create Date: 2024-07-23 16:22:06.646665

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'c8665401cae8'
down_revision = 'b7b8b5220cf9'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('entries',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('date', sa.String(), nullable=False),
    sa.Column('miles', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('trip_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['trip_id'], ['trips.id'], name=op.f('fk_entries_trip_id_trips')),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], name=op.f('fk_entries_user_id_users')),
    sa.PrimaryKeyConstraint('id', name=op.f('pk_entries'))
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('entries')
    # ### end Alembic commands ###
