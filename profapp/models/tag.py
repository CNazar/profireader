from ..constants.TABLE_TYPES import TABLE_TYPES
from sqlalchemy import Column, ForeignKey
from sqlalchemy.orm import relationship
from .pr_base import PRBase, Base


class TagPortal(Base, PRBase):
    __tablename__ = 'tag_portal'
    id = Column(TABLE_TYPES['id_profireader'], nullable=False, primary_key=True)

    tag = Column(TABLE_TYPES['name'], nullable=False, default='')

    description = Column(TABLE_TYPES['string_500'], nullable=False, default='')

    portal_id = Column(TABLE_TYPES['id_profireader'],
                       ForeignKey('portal.id', onupdate='CASCADE', ondelete='CASCADE'),
                       nullable=False)

    def __init__(self, tag='', description='', portal_id=None):
        super(TagPortal, self).__init__()
        self.tag = tag
        self.description = description
        self.portal_id = portal_id

    def get_client_side_dict(self, fields='id|tag|description', more_fields=None):
        return self.to_dict(fields, more_fields)


class TagPortalDivision(Base, PRBase):
    __tablename__ = 'tag_portal_division'
    id = Column(TABLE_TYPES['id_profireader'], nullable=False, primary_key=True)

    portal_division_id = Column(TABLE_TYPES['id_profireader'],
                                ForeignKey('portal_division.id', onupdate='CASCADE', ondelete='CASCADE'),
                                nullable=False)

    tag_portal_id = Column(TABLE_TYPES['id_profireader'],
                           ForeignKey('tag_portal.id', onupdate='CASCADE', ondelete='CASCADE'),
                           nullable=False)

    portal_division = relationship('PortalDivision', uselist=False)
    tag_portal = relationship(TagPortal, uselist=False)

    def __init__(self, portal_division=None, tag_portal=None):
        super(TagPortalDivision, self).__init__()
        self.tag_portal = tag_portal
        self.portal_division = portal_division
