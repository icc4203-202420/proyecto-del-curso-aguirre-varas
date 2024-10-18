class ChangeBarIdToEventIdInFriendships < ActiveRecord::Migration[7.0]
  def change
    rename_column :friendships, :bar_id, :event_id
    
    change_column_null :friendships, :event_id, true
  end
end
