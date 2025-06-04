"""initial high_scores table"""

from alembic import op
import sqlalchemy as sa

revision = '0001'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    op.create_table(
        'high_scores',
        sa.Column('id', sa.Integer(), primary_key=True),
        sa.Column('initials', sa.String(length=3), nullable=False),
        sa.Column('score', sa.Integer(), nullable=False),
    )


def downgrade():
    op.drop_table('high_scores')
