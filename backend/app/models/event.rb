class Event < ApplicationRecord
  belongs_to :bar
  has_many :attendances
  has_many :users, through: :attendances

  has_many :event_pictures, dependent: :destroy

end
