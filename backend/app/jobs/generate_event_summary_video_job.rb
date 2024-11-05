
require 'open-uri'
class GenerateEventSummaryVideoJob < ApplicationJob
  queue_as :default

  def perform(event_id)
    puts("Generating video #{event_id}")
    event = Event.find_by(id: event_id)
    return unless event
    puts("Event found #{event.id}") 
    puts("Generating video for event #{event.id}")
    images_path = Rails.root.join("tmp/event_images/#{event.id}")
    FileUtils.mkdir_p(images_path) unless File.directory?(images_path)

    puts("Downloading images for event #{event.id}")
    event.event_pictures.each_with_index do |picture, index|
      image_path = images_path.join("image_#{index}.jpg")
      File.open(image_path, 'wb') do |file|
        file.write(File.read(ActiveStorage::Blob.service.send(:path_for, picture.image.key)))
      end
    end
    

    puts("Creating video for event #{event.id}")

    video_output_path = Rails.root.join("tmp/event_videos", "event_#{event.id}_summary.mp4")
    FileUtils.mkdir_p(File.dirname(video_output_path))


    ffmpeg_command = "ffmpeg -framerate 1/3 -pattern_type glob -i '#{images_path}/*.jpg' -c:v libx264 -pix_fmt yuv420p #{video_output_path}"
    system(ffmpeg_command)

    puts("Video created for event #{event.id}")

    if File.exist?(video_output_path)
      event.video.attach(io: File.open(video_output_path), filename: "event_#{event.id}_summary.mp4", content_type: 'video/mp4')
    end

    FileUtils.rm_rf(images_path)
    FileUtils.rm_f(video_output_path)
  end
end
