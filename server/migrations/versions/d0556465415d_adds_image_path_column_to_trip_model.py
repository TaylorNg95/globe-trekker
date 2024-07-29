"""adds image_path column to trip model

Revision ID: d0556465415d
Revises: dbc4bc017336
Create Date: 2024-07-29 11:47:04.848105

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'd0556465415d'
down_revision = 'dbc4bc017336'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('trips', schema=None) as batch_op:
        batch_op.add_column(sa.Column('image_path', sa.String(), nullable=True))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('trips', schema=None) as batch_op:
        batch_op.drop_column('image_path')

    # ### end Alembic commands ###
