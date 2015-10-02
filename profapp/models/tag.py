from ..constants.TABLE_TYPES import TABLE_TYPES
from sqlalchemy import Column, ForeignKey, UniqueConstraint, CheckConstraint
from sqlalchemy.orm import relationship, backref
from ..controllers import errors
from flask import g
from utils.db_utils import db
from .company import Company
# from .portal import PortalDivision
# from .articles import ArticlePortal
from .pr_base import PRBase, Base


class Tag(Base, PRBase):
    __tablename__ = 'tag'
    id = Column(TABLE_TYPES['id_profireader'], nullable=False, primary_key=True)
    name = Column(TABLE_TYPES['short_name'], unique=True, primary_key=True)

    def __init__(self, name=None):
        super(Tag, self).__init__()
        self.name = name

    def attach(self):
        pass

    def remove(self):
        pass

    def delete(self):
        pass


class TagPortalDivision(Base, PRBase):
    __tablename__ = 'tag_portal_division'
    id = Column(TABLE_TYPES['id_profireader'], nullable=False, primary_key=True)
    tag_id = Column(TABLE_TYPES['id_profireader'], ForeignKey(Tag.id), nullable=False)
    position = Column(TABLE_TYPES['int'],
                      CheckConstraint('position >= 1', name='cc_position'),
                      nullable=False, default=1)
    portal_division_id = Column(TABLE_TYPES['id_profireader'],
                                ForeignKey('portal_division.id'),
                                nullable=False)
    UniqueConstraint('tag_id', 'portal_division_id', name='uc_tag_id_portal_division_id')
    UniqueConstraint('position', 'portal_division_id', name='uc_position_portal_division_id')

    tag = relationship('Tag', uselist=False)
    portal_division = relationship('PortalDivision', backref='tags')
    articles = relationship('ArticlePortal', secondary='tag_portal_division_article',
                            backref=backref('tags', lazy='dynamic'), lazy='dynamic')

    def __init__(self, tag_id=None, portal_division_id=None, position=1):
        super(TagPortalDivision, self).__init__()
        self.position = position
        self.tag_id = tag_id
        self.portal_division_id = portal_division_id


class TagPortalDivisionArticle(Base, PRBase):
    __tablename__ = 'tag_portal_division_article'
    id = Column(TABLE_TYPES['id_profireader'], nullable=False, primary_key=True)
    article_portal_id = Column(TABLE_TYPES['id_profireader'],
                               ForeignKey('article_portal.id'),
                               nullable=False)
    tag_portal_division_id = Column(TABLE_TYPES['id_profireader'],
                                    ForeignKey('tag_portal_division.id'),
                                    nullable=False)
    # cr_tm = Column(TABLE_TYPES['timestamp'])

    article = relationship('ArticlePortal', backref=backref('tag_assoc', lazy='dynamic'))
    tag = relationship('TagPortalDivision', backref=backref('article_assoc', lazy='dynamic'))
#     TODO: many to many to many...
    UniqueConstraint('article_portal_id', 'tag_portal_division_id', name='uc_article_tag_id')


# class KeyWords(Base, PRBase):

